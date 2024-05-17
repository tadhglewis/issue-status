import "styled-components";

type Badge = {
  background: string;
  text: string;
};

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      body: string;
      content: string;
      text: string;
      hintText: string;
      operational: Badge;
      performanceIssues: Badge;
      partialOutage: Badge;
      majorOutage: Badge;
      unknown: Badge;
      status: {
        active: Badge;
        closed: Badge;
      };
    };
  }
}
