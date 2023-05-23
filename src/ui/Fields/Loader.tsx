import styled,{keyframes} from "styled-components";

type SkeletonProps ={
    width:number
    height:number
}

export const StyledSkeleton = styled.div<SkeletonProps>`
	width: ${({ width }) => width};
`

