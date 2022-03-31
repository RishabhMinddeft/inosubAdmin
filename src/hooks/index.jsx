import { useState, useRef, useEffect } from "react";


export const useInfiniteLoading = (props) => {
    
    const { getItems } = props; /* 1 */
    const [items, setItems] = useState([]);
    const pageToLoad = useRef(new URLSearchParams(window.location.search).get('page') || 1); /* 2 */
    const initialPageLoaded = useRef(false);
    const [hasMore, setHasMore] = useState(true);
  
    const loadItems = async () => { /* 3 */
      const response = await getItems({
        page: pageToLoad.current++
      });
      let data = response.data // items list
      let totalPages = response.pagination.totalPages // pagination object
      setHasMore(totalPages >= pageToLoad.current); /* 4 */
      setItems(prevItems => [...prevItems, ...data]);

    };
  
    useEffect(() => {
      if (initialPageLoaded.current) {
        return;
      }
  
      loadItems(); /* 5 */
      initialPageLoaded.current = true;
      // eslint-disable-next-line
    }, [loadItems])
  
    return {
      items,
      hasMore,
      loadItems
    };
}


export const withClickOutside = (WrappedComponent) => {

    const Component = (props) => {
      const [open, setOpen] = useState(false);
  
      const ref = useRef();
  
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (!ref?.current?.contains(event.target)) {
            setOpen(false);
          }
        };
        document.addEventListener("mousedown", handleClickOutside);
      }, [ref]);
  
      return <WrappedComponent {...props} open={open} setOpen={setOpen} ref={ref}/>;
    };
  
    return Component;
}