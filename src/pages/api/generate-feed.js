import { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';
import { Feed } from 'feed';
import { mkdir, writeFile } from 'fs/promises';

import { getAllArticles } from './getAllArticles';

const generateRssFeed = async () => {
  let articles = await getAllArticles();
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  let author = {
    name: 'Spencer Sharp',
    email: 'spencer@planetaria.tech',
  };

  let feed = new Feed({
    title: author.name,
    description: 'Your blog description',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `All rights reserved ${new Date().getFullYear()}`,
    feedLinks: {
      rss2: `${siteUrl}/rss/feed.xml`,
      json: `${siteUrl}/rss/feed.json`,
    },
  });

  for (let article of articles) {
    let url = `${siteUrl}/articles/${article.slug}`;
    let html = ReactDOMServer.renderToStaticMarkup(
      <article.component isRssFeed />
    );

    feed.addItem({
      title: article.title,
      id: url,
      link: url,
      description: article.description,
      content: html,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    });
  }

  await mkdir('./public/rss', { recursive: true });
  await Promise.all([
    writeFile('./public/rss/feed.xml', feed.rss2(), 'utf8'),
    writeFile('./public/rss/feed.json', feed.json1(), 'utf8'),
  ]);
};

export default async (req, res) => {
  try {
    await generateRssFeed();
    res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Error generating RSS feed:', error);
    res.status(500).json({ status: 'error', error });
  }
};
