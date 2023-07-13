import CastsTable from "../components/CastsTable";
import CharacterTable from "../components/CharacterTable";
import { useDeleteCharacterMutation, useGetAllCharactersQuery } from "../redux/features/characters/charactersApi";
import { useGetAllCastQuery } from "../redux/features/cast/castApi";
import Loader from "../components/Loader";
const HomePage = () => {
  const { data, isLoading, isError, isSuccess } = useGetAllCharactersQuery();
  const {
    data: castsData,
    isLoading: isCastLoading,
    isError: isCastError,
    isSuccess: isCastSuccess,
  } = useGetAllCastQuery();

  let content;
  if (isLoading || isCastLoading) {
    content = <Loader />;
  } else if ((!isLoading || !isCastLoading) && (isError || isCastError)) {
    content = <div>something is wrong</div>;
  } else if (
    (!isLoading && !isCastLoading && !isError && !isCastError && isSuccess) ||
    isCastSuccess
  ) {
    content = (
      <>
        <CharacterTable
          title="My Characters"
          data={data.data}
          link="/add-character"
        />
        <CastsTable
          classes={"mt-24"}
          title="My Casts"
          data={castsData.data}
          link="/add-cast"
        />
      </>
    );
  }
  return content;
};

export default HomePage;
