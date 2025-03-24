import IdeaFilters from "@/components/idea/IdeaFilters";
import IdeaHeader from "@/components/idea/IdeaHeader";
import IdeaList from "@/components/idea/IdeaList";
import Container from "@/components/Container";
import { memo, Suspense } from "react";
import IdeaCardSkeleton from "@/components/home/FeaturedIdeaSkeleton";
import IdeaFilterSkeleton from "@/components/skeleton/IdeaFilterSkeleton";

const IdeasPage = async () => {
    return (
        <Container>
            <div className="px-4 sm:px-6 lg:px-8 py-8">
                <Suspense fallback={<IdeaCardSkeleton />}>
                    <IdeaHeader />
                </Suspense>

                <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1">
                        <Suspense fallback={<IdeaFilterSkeleton />}>
                            <IdeaFilters />
                        </Suspense>
                    </div>

                    <div className="lg:col-span-3">
                        <Suspense fallback={<IdeaCardSkeleton />}>
                            <IdeaList />
                        </Suspense>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default memo(IdeasPage);