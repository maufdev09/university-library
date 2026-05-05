import BookList from "@/components/ui/BookList";
import BookOverview from "@/components/ui/BookOverview";
import { Button } from "@/components/ui/button";
import { sampleBooks } from "@/constant";

export default function Home() {
  return (
    <>
      <BookOverview {...sampleBooks[0]} />
      <BookList
        books={sampleBooks}
        title="Latest Books"
        containerClassName="mt-28"
      />
    </>
  );
}
