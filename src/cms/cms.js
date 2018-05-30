import CMS from 'netlify-cms';

import BlogPost from './templates/BlogPost';
import StaticPage from './templates/StaticPage';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('blog', BlogPost);
CMS.registerPreviewTemplate('page', StaticPage);
