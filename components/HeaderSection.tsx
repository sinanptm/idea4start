import ShareIdeaButton from './ShareIdeaButton';

const HeaderSection = () => {
    return (
        <>
            <div className="flex items-center justify-between h-12 border-b pb-4">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-semibold">My Ideas</h1>
                    <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">Total Ideas:</span>
                        <span className="font-medium">0</span>
                    </div>
                </div>
                <ShareIdeaButton />
            </div>

            <div className="grid gap-6">
                <div className="rounded-lg border p-4">
                    <p className="text-muted-foreground text-center">
                        No ideas yet. Click the bulb icon to create your first idea!
                    </p>
                </div>
            </div>
        </>
    );
};

export default HeaderSection;