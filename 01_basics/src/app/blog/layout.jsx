export default function BlogLayout({children}) {
    return (
        <>
        <h2>Blog </h2>
        <main>
            {children}
        </main>
        <p>This is a nice blog</p>
        </>
    )
}