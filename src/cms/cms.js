import CMS from 'netlify-cms';

import BlogPost from './templates/BlogPost';
import StaticPage from './templates/StaticPage';
import ProjectItem from './templates/ProjectItem';

CMS.registerPreviewStyle('/styles.css');
CMS.registerPreviewTemplate('blog', BlogPost);
CMS.registerPreviewTemplate('page', StaticPage);
CMS.registerPreviewTemplate('project', ProjectItem);
