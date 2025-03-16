import Container from "@/components/Container";
import IdeaHeader from "@/components/idea/IdeaHeader";
import IdeaList from "@/components/idea/IdeaList";
import IdeaFilters from "@/components/idea/IdeaFilters";
import { memo, Suspense } from "react";

const IdeasPage = async () => {

    return (
        <Container>
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <IdeaHeader />

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <IdeaFilters />
                    </div>

                    <div className="lg:col-span-3">
                        <Suspense fallback={<div className="text-center py-10">Loading ideas...</div>}>
                            <IdeaList />
                        </Suspense>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default memo(IdeasPage);