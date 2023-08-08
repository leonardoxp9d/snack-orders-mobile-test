import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    title: string;

    colors: {
      background: string;
      primaryColor: string;
      white: string;
      gray: string;
      grayHard: string;
      inputs: string;
      shape: string;
      blackMedium: string;
      error: string;
    };
  }
}
