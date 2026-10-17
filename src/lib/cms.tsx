import React, { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { getSupabase } from "./supabaseClient";

export interface SiteContentRow {
  key: string;
  page: string;
  section: string;
  label: string;
  type: string;
  value: any;
  draft_value?: any;
  default_value: any;
  sort_order: number;
}

export interface ContentListRow<T = any> {
  id: string;
  list_key: string;
  data: T;
  sort_order: number;
  is_visible: boolean;
}

// In-memory cache for fast lookups
const memoryCache: Record<string, any> = {};

export function isPreviewMode(): boolean {
  if (typeof window === "undefined") return false;
  const params = new URLSearchParams(window.location.search);
  return params.get("preview") === "1";
}

/**
 * Fetch all content keys for a given page
 */
export async function fetchCmsPage(
  page: string,
  preview = false,
): Promise<Record<string, any>> {
  const supabase = getSupabase();
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("key, value, draft_value, type")
      .eq("page", page);

    if (error) {
      console.warn(`CMS: Failed to fetch page '${page}':`, error.message);
      return {};
    }

    const result: Record<string, any> = {};
    for (const row of data || []) {
      const val = preview && row.draft_value !== null && row.draft_value !== undefined
        ? row.draft_value
        : row.value;
      result[row.key] = val;
      memoryCache[row.key] = val;
    }

    return result;
  } catch (err) {
    console.warn(`CMS: Exception fetching page '${page}':`, err);
    return {};
  }
}

/**
 * Fetch a repeatable list by its list_key
 */
export async function fetchCmsList<T = any>(
  listKey: string,
  preview = false,
): Promise<T[]> {
  const supabase = getSupabase();
  try {
    let query = supabase
      .from("content_lists")
      .select("id, data, sort_order, is_visible")
      .eq("list_key", listKey)
      .order("sort_order", { ascending: true });

    if (!preview) {
      query = query.eq("is_visible", true);
    }

    const { data, error } = await query;
    if (error) {
      console.warn(`CMS: Failed to fetch list '${listKey}':`, error.message);
      return [];
    }

    return (data || []).map((row) => ({
      ...row.data,
      _id: row.id,
      _sort_order: row.sort_order,
      _is_visible: row.is_visible,
    })) as T[];
  } catch (err) {
    console.warn(`CMS: Exception fetching list '${listKey}':`, err);
    return [];
  }
}

/**
 * Fetch a single content value
 */
export async function fetchCmsValue<T = any>(
  key: string,
  fallback: T,
  preview = false,
): Promise<T> {
  const supabase = getSupabase();
  try {
    const { data, error } = await supabase
      .from("site_content")
      .select("value, draft_value")
      .eq("key", key)
      .single();

    if (error || !data) {
      return fallback;
    }

    const val = preview && data.draft_value !== null && data.draft_value !== undefined
      ? data.draft_value
      : data.value;

    memoryCache[key] = val;
    return (val !== null && val !== undefined ? val : fallback) as T;
  } catch {
    return fallback;
  }
}

/**
 * React Hook: Load an entire page's CMS content
 */
export function useCmsPage(page: string) {
  const preview = isPreviewMode();

  return useQuery({
    queryKey: ["cms", page, preview],
    queryFn: () => fetchCmsPage(page, preview),
    staleTime: 45 * 1000, // 45 seconds cache
    refetchOnWindowFocus: false,
  });
}

/**
 * React Hook: Load a single value with instant fallback
 */
export function useCmsValue<T = any>(key: string, fallback: T): T {
  // Check memory cache first
  const cached = memoryCache[key];
  const initial = cached !== null && cached !== undefined ? cached : fallback;

  // Determine page from key namespace
  const page = key.split(".")[0] || "global";
  const { data } = useCmsPage(page);

  if (data && data[key] !== undefined && data[key] !== null) {
    return data[key] as T;
  }
  return initial;
}

/**
 * React Hook: Load a repeatable list with typed fallback
 */
export function useCmsList<T = any>(
  listKey: string,
  fallback: T[] = [],
): { items: T[]; isLoading: boolean } {
  const preview = isPreviewMode();

  const { data, isLoading } = useQuery({
    queryKey: ["cms_list", listKey, preview],
    queryFn: () => fetchCmsList<T>(listKey, preview),
    staleTime: 45 * 1000,
    refetchOnWindowFocus: false,
  });

  const items = useMemo(() => {
    if (data && data.length > 0) return data;
    return fallback;
  }, [data, fallback]);

  return { items, isLoading };
}

/**
 * Safe Rich Text Sanitizer
 */
export function sanitizeHtml(html: string): string {
  if (typeof window === "undefined") return html;
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ["b", "i", "em", "strong", "a", "p", "br", "ul", "ol", "li", "span"],
    ALLOWED_ATTR: ["href", "target", "rel", "class", "style"],
  });
}

/**
 * Component: <Cms k="home.hero.title" fallback="..." />
 */
export interface CmsProps extends React.HTMLAttributes<HTMLElement> {
  k: string;
  fallback: string;
  as?: React.ElementType;
  isHtml?: boolean;
}

export function Cms({
  k,
  fallback,
  as: Component = "span",
  isHtml = false,
  className,
  style,
  ...rest
}: CmsProps) {
  const value = useCmsValue<string>(k, fallback);

  if (isHtml && typeof value === "string") {
    return (
      <Component
        className={className}
        style={style}
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(value) }}
        {...rest}
      />
    );
  }

  return (
    <Component className={className} style={style} {...rest}>
      {value}
    </Component>
  );
}

/**
 * Component: <CmsImage k="home.hero.image" fallback="..." alt="..." />
 */
export interface CmsImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  k: string;
  fallback: string;
}

export function CmsImage({
  k,
  fallback,
  alt = "",
  loading = "lazy",
  className,
  style,
  ...rest
}: CmsImageProps) {
  const src = useCmsValue<string>(k, fallback);

  return (
    <img
      src={src || fallback}
      alt={alt}
      loading={loading}
      className={className}
      style={style}
      {...rest}
    />
  );
}
