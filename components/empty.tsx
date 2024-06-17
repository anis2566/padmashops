interface EmptyProps {
    title: string;
}

export const Empty = ({title}:EmptyProps) => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-800">
                <img
                    src="/empty.png"
                    alt="Empty"
                />
            </div>
            <div className="space-y-2 text-center">
                <h2 className="text-xl font-bold tracking-tight text-muted-foreground">{title}</h2>
            </div>
        </div>
    )
}