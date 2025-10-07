/**
 * Converts plain text with paragraphs and URLs into formatted JSX
 * - Detects URLs and converts them to clickable links
 * - Preserves line breaks and paragraphs
 */

const URL_REGEX = /(https?:\/\/[^\s]+)/g;

export function formatTextWithLinks(text: string | undefined): React.ReactNode {
  if (!text) return null;

  // Split text by newlines to preserve paragraphs
  const paragraphs = text.split(/\n\n+/);

  return paragraphs.map((paragraph, pIndex) => {
    // Split paragraph by newlines within it
    const lines = paragraph.split(/\n/);

    const formattedLines = lines.map((line, lIndex) => {
      // Split line by URLs
      const parts = line.split(URL_REGEX);

      const formattedParts = parts.map((part, partIndex) => {
        // Check if part is a URL
        if (URL_REGEX.test(part)) {
          return (
            <a
              key={partIndex}
              href={part}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline"
            >
              {part}
            </a>
          );
        }
        return part;
      });

      return (
        <span key={lIndex}>
          {formattedParts}
          {lIndex < lines.length - 1 && <br />}
        </span>
      );
    });

    return (
      <p key={pIndex} className="mb-4 last:mb-0">
        {formattedLines}
      </p>
    );
  });
}
