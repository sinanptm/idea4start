import Container from "@/components/Container";
import IdeaDetailHeader from "@/components/idea/IdeaDetailHeader";
import IdeaDetailContent from "@/components/idea/IdeaDetailContent";
import IdeaDetailSidebar from "@/components/idea/IdeaDetailSideBar";
import IdeaComments from "@/components/idea/IdeaComments";
import { notFound } from "next/navigation";
import { getIdea } from "@/lib/api";


const IdeaDetailPage = async ({ params }: { params: Promise<{ id: string; }>; }) => {
  const idea = await getIdea((await params).id);

  if (!idea) {
    notFound();
  }

  return (
    <Container>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <IdeaDetailHeader idea={idea} />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IdeaDetailContent idea={idea} />
            <div className="mt-10">
              <IdeaComments ideaId={idea._id} />
            </div>
          </div>

          <div className="lg:col-span-1">
            <IdeaDetailSidebar idea={idea} />
          </div>
        </div>
      </div>
    </Container>
  );
};

export default IdeaDetailPage;
