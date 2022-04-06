import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import detectEthereumProvider from '@metamask/detect-provider';
import { Toast } from '../helper/toastify.message';
import { web3 } from '../web3';
import routes from '../routes';
import { chainId, chainIdHex } from '../config';


export const useAuth = (props) => {

  const { route } = props
  const navigate = useNavigate()
  const [isloggedIn, setIsLoggedIn] = useState(undefined)


  useEffect(() => {
    const enable = async () => {
      const accounts = await web3.eth.getAccounts()
      const resp = await web3.eth.net.getId();
      let authenticated = routes(true).find(obj => obj.path === route)
      if (accounts.length && resp === chainId && authenticated.privateRoute) {
        setIsLoggedIn(true)
      } else {
        localStorage.clear()
        navigate('/')
      }
    }
    enable()
  }, [])

  return {
    isloggedIn,
  };
}


export const useMetaMaskAuth = (props) => {

  const { action, generateNonce } = props
  const [nonce, setNonce] = useState(true)
  const [account, setAccount] = useState(null)

  useEffect(() => {
    if (account) {
      generateNonce(account)
      // setNonce(false)
    }
  }, [nonce])

  const enable = async () => {
    localStorage.setItem('isDisconnect', '0')
    const response = await web3.eth.getAccounts()
    setAccount(response[0])
    setNonce(!nonce)
  }

  const activate = async () => { 
    try {
      /* check MetaMask installed */
      let provider = await detectEthereumProvider() 
      if (provider) {
        const resp = await web3.eth.net.getId();
        if (resp !== chainId) {
          /* add binance testnet network */
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [
              {
                chainId: '0x61',
                chainName: 'Binance Smart Chain',
                nativeCurrency: {
                  name: 'Binance Test Token',
                  symbol: 'BNB',
                  decimals: 18
                },
                rpcUrls:['https://data-seed-prebsc-1-s1.binance.org:8545']
              },
            // params: [
            //   {
            //     chainId: '0x61',
            //     chainName: 'Binance Smart Chain',
            //     nativeCurrency: {
            //       name: 'Binance Chain Token',
            //       symbol: 'BNB',
            //       decimals: 18
            //     },
            //     // rpcUrls: ['https://bsc-dataseed2.binance.org/'],
            //     rpcUrls:['https://data-seed-prebsc-1-s1.binance.org:8545']
            //   },
            ],
          });
          /* switch network request */
          await window.ethereum.request({
              method: 'wallet_switchEthereumChain',
              params: [{ chainId: chainIdHex }], // chainId must be in hexadecimal numbers
          })
          await enable()
        }
        /* send account request */
        const rep = await window.ethereum.request({ method: 'eth_requestAccounts'})
        if (rep) {
          await enable()
        }
      } else {
        Toast.warning('Please Install MetaMask Wallet.!')
      }
    } catch (ex) {
      console.log(ex)
    }
  }

  return {
    account,
    activate,
  };

}


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