import SectionCard from "@/components/SectionCard"


function Home() {
  return (
    <div>
      <div className="row justify-content-center mx-2">
        <SectionCard
          destUrl="/contracts"
          name="Contracts"
          description="View, add, update or delete the contracts"
        />
        <SectionCard
          destUrl="/usage"
          name="Usage"
          description="Select contracts and calculate costs"
        />
      </div>

    </div>
  )
}

export default Home