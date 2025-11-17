// Extend React's ImgHTMLAttributes to include fetchPriority
import 'react';

declare module 'react' {
  interface ImgHTMLAttributes<T> {
    // Add the fetchPriority attribute for image loading optimization
    fetchPriority?: 'auto' | 'high' | 'low' | string;
  }
}

