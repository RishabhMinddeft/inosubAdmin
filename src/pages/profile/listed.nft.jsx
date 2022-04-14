import { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { useInfiniteLoading } from '../../hooks'
import { services } from '../../services'
import NFT from '../../components/nft.module';
import PleaseWait from '../../modals/please-wait';
import LMShape from '../../assets/images/lm-shape.png';
import { nftList } from '../../config';


const ListedNFT = () => {

    const url = nftList + '?isListed=true&status=NOT_MINTED&page='
    const [isLoading, setIsLoading] = useState(false)
    const { items, hasMore, loadItems } = useInfiniteLoading({
        getItems: async ({ page }) => {
            try {
                setIsLoading(true) // start calling api
                const response = await services.get(url + page) /* Call API endpoint */
                setIsLoading(false) // stop calling api
                return response.data
            } catch (error) {
                console.log(error)
            }
        }
    });

    if (items.length === 0) {
        return <div style={{ textAlign: 'center' }}>No data found!</div>
    }


    return (
        <>
            <LeftOuter>
                {items.map((item, key) => <NFT nft={item} key={key} />)}
            </LeftOuter>

            {isLoading && <PleaseWait isLoading={isLoading} />}

            {hasMore && !isLoading &&
                <LoadMore onClick={() => loadItems()}>
                    <img src={LMShape} alt='' />
                    <Link to='#' >Load More</Link>
                    <img src={LMShape} className='mirrored' alt='' />
                </LoadMore>
            }
        </>
    )
}

const FlexDiv = styled.div`
  display: flex; align-items: center; justify-content: center; flex-wrap: wrap;
`;


const LeftOuter = styled(FlexDiv)`
  justify-content:flex-start; margin:0px -12px;
`;


const LoadMore = styled(FlexDiv)`
  margin:0px 0px 100px;
  img{margin:0px 20px;}
  a{font-style: normal; font-weight: 700; font-size: 16px; line-height: 20px; color: #7BF5FB; letter-spacing:0.5px;
    :hover{opacity:0.8;}
  }
`;

export default ListedNFT;