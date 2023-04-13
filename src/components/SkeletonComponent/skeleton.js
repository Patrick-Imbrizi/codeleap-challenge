import React from "react"
import ContentLoader from "react-content-loader"

const PostSkeleton = (props) => (
    <ContentLoader
        speed={2}
        height={200}
        width={'100%'}
        margin={'auto'}
        backgroundColor="#f3f3f3"
        foregroundColor="#ecebeb"
        {...props}
    >
        <rect x="0" y="0" rx="16" ry="16" width={'100%'} height="200" />
    </ContentLoader>
)

export default PostSkeleton