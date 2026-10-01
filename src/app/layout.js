import "./globals.css";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";

export const metadata = {
    title: "냉장고민",
    description: "내 냉장고 속 재료로 오늘 뭐 먹지?",
};

export default function RootLayout({ children }) {
    return (
        <html lang="ko">
            <body>
                <Header />
                <main className="main-content">{children}</main>
                <Footer />
            </body>
        </html>
    );
}
