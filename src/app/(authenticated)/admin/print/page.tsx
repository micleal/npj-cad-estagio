export default async function PrintPage({
  params,
}: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!id) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <PrintableArea />
      </div>
    );
  }

  return <div>PrintPage</div>;
}
