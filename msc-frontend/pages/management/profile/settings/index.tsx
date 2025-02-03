import SidebarLayout from '@/layouts/SidebarLayout';
import * as React from 'react';
import ArtactividadContainer from '../../../containers/ArtactividadContainer';

function ManagementUserSettings() {
  return (
    <>
      <div className='conatainer-art'>
        <ArtactividadContainer />
      </div>
    </>
  );
}

ManagementUserSettings.getLayout = (page) => (
  <SidebarLayout>{page}</SidebarLayout>
);

export default ManagementUserSettings;
