import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 16,
        fontFamily: "Inter, sans-serif",
        textAlign: "center",
        padding: 24,
      }}
    >
      <h1 style={{ fontSize: 32, fontWeight: 700, color: "#111", margin: 0 }}>Page not found</h1>
      <p style={{ color: "#666", margin: 0 }}>The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link href="/" style={{ color: "#3dba44", fontWeight: 700, textDecoration: "none" }}>
        Back to home
      </Link>
    </div>
  );
}
