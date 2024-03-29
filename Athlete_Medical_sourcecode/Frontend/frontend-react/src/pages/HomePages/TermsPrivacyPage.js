/*This code imports two components, "HeaderNormal" and "TermsPrivacyForm", 
and defines a new component called "TermsPrivacyPage". 
When this component is called, it will render the "HeaderNormal" and "TermsPrivacyForm" components in JSX syntax. 
The "TermsPrivacyPage" component is then exported so that it can be used elsewhere in the program.
*/
import HeaderNormal from '../../components/Home/HeaderNormal';
import TermsPrivacyForm from '../../components/Home/TermsPrivacyForm';

const TermsPrivacyPage  = () => {


    return(
      <>
      <HeaderNormal/>
      <TermsPrivacyForm/>      
      </>
        
    )
};
//The component is exported as a default export
export default TermsPrivacyPage;