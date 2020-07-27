import React from 'react';
import { Skeleton, } from '@material-ui/lab/';

const leton = () => {

    return(
        <div>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding:20}}>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
                <Skeleton variant="rect" width={30} height={20} animation="wave"/>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
            </div>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding:20}}>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
                <Skeleton variant="rect" width={30} height={20} animation="wave"/>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
            </div>
            <div style={{display: 'flex', flexDirection:'row', justifyContent:'space-between', padding:20}}>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
                <Skeleton variant="rect" width={30} height={20} animation="wave"/>
                <Skeleton variant="rect" width={120} height={20} animation="wave"/>
            </div>
        </div>
    )
}

export default leton;