import AlphabetDetailClient from "@/components/alphabet-detail-client"


export default async function AlphabetDetailPage({ params }) {
  const {letter} = await params
  return ( <AlphabetDetailClient selectedAlphabet={letter} /> )
}
