import ViewPromocoes from '@/view/promocoes/ViewPromocoes';

interface ViewPromocoesProps {
  params: {
    slug: string;
  };
}

const pageViewPromocoes = async ({ params }: ViewPromocoesProps) => {
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  return <ViewPromocoes slug={slug} />;
};

export default pageViewPromocoes;
