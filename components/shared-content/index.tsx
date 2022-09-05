import CategoryImgLinks from '../category-img-links';
import MaxWidthWrapper from '../max-width-wrapper';
import Grid from '../grid';
import CommonDescription from '../common-description';

type Props = {
  children?: React.ReactNode;
  type: 'a' | 'b';
  padTop?: boolean;
};

const SharedContent = ({ children, type, padTop = false }: Props) => {
  return (
    <MaxWidthWrapper>
      <Grid type={type}>
        <CategoryImgLinks padTop={padTop} />
        {children}
        <CommonDescription />
      </Grid>
    </MaxWidthWrapper>
  );
};

export default SharedContent;
