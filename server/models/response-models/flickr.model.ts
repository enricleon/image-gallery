export interface FlickrSearchResponse {
    body: { photos: { photo: Array<{
        farm: string;
        server: string;
        secret: string;
        title: string;
        id: string;
        user: string;  
    }> }};
}

export interface FlickrSizeResponse {
    body: { sizes: { size: Array<{
        label: string,
        width: string,
        height: string,
        source: string,
        url: string
    }> }};
}