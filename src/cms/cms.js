import CMS from 'netlify-cms';

import BlogPost from './templates/BlogPost';

CMS.registerPreviewStyle('/style.css');
CMS.registerPreviewTemplate('blog', BlogPost);
