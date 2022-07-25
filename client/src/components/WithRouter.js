import {
    //useLocation,
    useNavigate,
    useParams
  } from "react-router-dom";

  export const withRouter = (Component) =>  {
    function ComponentWithRouterProp(props) {
      //let location = useLocation();
      let navigate = useNavigate();
      let params = useParams();
      return (
        <Component params={params} navigate={navigate} {...props} />
      );
    }
    return ComponentWithRouterProp;
  }

  