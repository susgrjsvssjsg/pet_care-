import "./globals.css";

export const metadata = {
  title: "梦佳宠物 · 新孟菲斯导航地图",
  description:
    "梦佳宠物位于北京市通州区府东苑13号楼11门，营业时间09:00-20:30。查看门店导航地图、洗护服务和预约信息。"
};

export const viewport = {
  width: "device-width",
  initialScale: 1
};

export default function RootLayout({ children }) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
