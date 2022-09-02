import CategoryImgLinks from '../category-img-links';
import Wrapper from '../wrapper';
import Grid from '../grid';
import CommonDescription from '../common-description';

type Props = {
  children?: React.ReactNode;
  type: 'a' | 'b';
  padTop?: boolean;
};

const SharedContent = ({ children, type, padTop = false }: Props) => {
  return (
    <>
      <Wrapper>
        <Grid type={type}>
          <CategoryImgLinks padTop={padTop} />
          {children}
          <CommonDescription />
        </Grid>
      </Wrapper>
    </>
  );
};

export default SharedContent;
