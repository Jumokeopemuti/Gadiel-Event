import "./globals.css";
import "react-datepicker/dist/react-datepicker.css";
import LayoutWrapper from "@/components/LayoutWrapper";

export const metadata = {
  title: "Event Decoration",
  description: "Professional Event Decoration Services",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}