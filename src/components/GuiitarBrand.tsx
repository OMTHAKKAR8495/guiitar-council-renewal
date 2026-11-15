import { type ImgHTMLAttributes } from "react";

export function GuiitarEmblem({
  className = "w-10 h-10",
  alt = "GUIITAR Council Emblem",
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="/guiitar-emblem.png"
      alt={alt}
      className={className}
      style={{
        objectFit: "contain",
        display: "inline-block",
        ...style,
      }}
      {...props}
    />
  );
}

export function GuiitarLogo({
  className = "site-logo-img",
  alt = "GUIITAR Council",
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <>
      <img
        src="/guiitar-council-logo.png"
        alt={alt}
        className={`${className} logo-light`}
        style={{
          height: "44px",
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
        {...props}
      />
      <img
        src="/guiitar-council-logo-dark.png"
        alt={alt}
        className={`${className} logo-dark`}
        style={{
          height: "44px",
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
        {...props}
      />
    </>
  );
}

export function GuiitarFullLogo({
  className = "site-logo-img",
  alt = "GUIITAR Council",
  style,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <>
      <img
        src="/guiitar-council-logo.png"
        alt={alt}
        className={`${className} logo-light`}
        style={{
          height: "44px",
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
        {...props}
      />
      <img
        src="/guiitar-council-logo-dark.png"
        alt={alt}
        className={`${className} logo-dark`}
        style={{
          height: "44px",
          width: "auto",
          objectFit: "contain",
          ...style,
        }}
        {...props}
      />
    </>
  );
}

export function StickyBackgroundWatermark() {
  return null;
}


