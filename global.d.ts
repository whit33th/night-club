declare global {
  namespace JSX {
    interface IntrinsicElements {
      marquee: React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLMarqueeElement>,
        HTMLMarqueeElement
      >;
    }
  }
}
