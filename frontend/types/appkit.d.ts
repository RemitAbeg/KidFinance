// Type declarations for Reown AppKit web components
declare namespace JSX {
  interface IntrinsicElements {
    'appkit-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement> & {
      balance?: 'show' | 'hide'
      size?: 'md' | 'sm'
      label?: string
    }
    'appkit-network-button': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>
  }
}

