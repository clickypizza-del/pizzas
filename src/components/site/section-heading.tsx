import { cn } from "@/lib/utils";

type EyebrowProps = {
  children: React.ReactNode;
  className?: string;
};

/** Small uppercase red label that sits above section titles. */
export function Eyebrow({ children, className }: EyebrowProps) {
  return (
    <span
      className={cn(
        "text-primary font-bold text-xs sm:text-sm uppercase tracking-[0.18em]",
        className,
      )}
    >
      {children}
    </span>
  );
}

type SectionHeadingProps = {
  eyebrow?: string;
  title: React.ReactNode;
  description?: React.ReactNode;
  align?: "center" | "left";
  className?: string;
};

/** Reusable section header: eyebrow + title + supporting copy. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "max-w-3xl mb-12 sm:mb-16",
        align === "center" ? "mx-auto text-center" : "text-left",
        className,
      )}
    >
      {eyebrow ? <Eyebrow className="block mb-3">{eyebrow}</Eyebrow> : null}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-foreground leading-[1.1] tracking-tight">
        {title}
      </h2>
      {description ? (
        <p className="mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed">
          {description}
        </p>
      ) : null}
    </div>
  );
}
