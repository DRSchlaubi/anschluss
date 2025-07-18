import type {Metadata} from "next";
import "./globals.css";

export const metadata: Metadata = {
    title: "Gauting-Murnau Anschluss",
    description: "Zeigt den aktuellen Status des Gauting-Murnau Anschlusses an",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body>
        {children}
        </body>
        </html>
    );
}
