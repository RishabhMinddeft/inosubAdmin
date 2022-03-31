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

export const useForm = (options) => {

  const [data, setData] = useState(options?.initialValues || {});
  const [errors, setErrors] = useState({});

  const handleChange = (
    key,
    sanitizeFn,
  ) => (e) => {
    const value = sanitizeFn ? sanitizeFn(e.target.value) : e.target.value;
    setData({
      ...data,
      [key]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validations = options?.validations;
    if (validations) {
      let valid = true;
      const newErrors = {};
      for (const key in validations) {
        const value = data[key];
        const validation = validations[key];
        if (validation?.required?.value && !value) {
          valid = false;
          newErrors[key] = validation?.required?.message;
        }

        const pattern = validation?.pattern;
        if (pattern?.value && !RegExp(pattern.value).test(value)) {
          valid = false;
          newErrors[key] = pattern.message;
        }

        const custom = validation?.custom;
        if (custom?.isValid && !custom.isValid(value)) {
          valid = false;
          newErrors[key] = custom.message;
        }
      }

      if (!valid) {
        setErrors(newErrors);
        return;
      }
    }

    setErrors({});
    if (options?.onSubmit) {
      options.onSubmit();
    }
  };

  return {
    data,
    handleChange,
    handleSubmit,
    errors,
  };
}