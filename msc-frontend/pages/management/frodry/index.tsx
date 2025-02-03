import Head from 'next/head';
import SidebarLayout from '@/layouts/SidebarLayout';
import PageHeader from '@/content/Management/Transactions/PageHeader';
import PageTitleWrapper from '@/components/PageTitleWrapper';


function frodri() {
  return (
    <>
      <Head>
        <title>
            hello
        </title>
      </Head>
      <PageTitleWrapper>
        <PageHeader />
      </PageTitleWrapper>
     
    </>
  );
}

frodri.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default frodri;
