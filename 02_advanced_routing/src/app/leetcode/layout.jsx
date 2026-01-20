export default function LeetCodeLayout({ children, editor, questionsList, team }) {
    return (
        <>
            <h2 className="text-green-500">LeetCode</h2>
            <div>
                {children}
            </div>
            <main className="flex w-full justify-between px-4">
                <aside>
                    {questionsList}
                </aside>
                <div>
                    {editor}
                </div>
                <div>
                    {team}
                </div>
            </main>
        </>
    )
}