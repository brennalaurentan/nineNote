// styles
import '../index.css';

// components / pages / images
import MainNavbar from '../components/common/MainNavbar';
import ModuleRecommenderTabSection from '../components/module_recommender/ModuleRecommenderTabSection';

// tools
import { Helmet } from 'react-helmet';

const ModuleRecommender = () => {
  return (
    <>
      <Helmet>
        <title>nineNote | Module Recommender</title>
      </Helmet>
      <MainNavbar />
      <ModuleRecommenderTabSection />
    </>
  )
}

export default ModuleRecommender