import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';

export default function TitlebarImageList() {
  return (
    <div style={{display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center"}}>
        <ImageList  sx={{ width: '60%', height: 450 }}>
      <ImageListItem key="Subheader" cols={2}>
        <ListSubheader component="div">Tour</ListSubheader>
      </ImageListItem>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            src={`${item.img}?w=248&fit=crop&auto=format`}
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            subtitle={item.author}
            actionIcon={
              <IconButton
                sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                aria-label={`info about ${item.title}`}
              >
                <InfoIcon />
              </IconButton>
            }
          />
        </ImageListItem>
      ))}
    </ImageList>
    </div>
  );
}

const itemData = [
  {
    img: '/img/list5.jpg',
    title: 'Evening',
    author: '@evening',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: '/img/list6.jpg',
    title: 'Evening',
    author: '@evening',
  },
  {
    img: '/img/list7.jpg',
    title: 'Sunset',
    author: '@helloimnik',
  },
  {
    img: '/img/list8.jpg',
    title: 'Sunset',
    author: '@nolanissac',
    cols: 2,
  },
  {
    img: '/img/sal-4.jpg',
    title: 'Desert',
    author: '@hjrc33',
    cols: 2,
  },
  {
    img: '/img/sal-1.jpg',
    title: 'Desert',
    author: '@arwinneil',
    rows: 2,
    cols: 2,
    featured: true,
  },
  {
    img: '/img/sal-3.avif',
    title: 'Desert',
    author: '@tjdragotta',
  },
  {
    img: '/img/sal-6.jpg',
    title: 'Desert',
    author: '@katie_wasserman',
  },
  {
    img: '/img/list1.jpg',
    title: 'Beautiful',
    author: '@silverdalex',
    rows: 2,
    cols: 2,
  },
  {
    img: '/img/list2.jpg',
    title: 'Beautiful',
    author: '@shelleypauls',
  },
  {
    img: '/img/list3.jpg',
    title: 'Beautiful',
    author: '@peterlaster',
  },
  {
    img: '/img/list4.jpg',
    title: 'Beautiful',
    author: '@southside_customs',
    cols: 2,
  },
];