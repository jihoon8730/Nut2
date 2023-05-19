import {
  FieldValues,
  useForm,
  SubmitHandler,
  Controller,
} from "react-hook-form";

// data
import koreaFamousFashionShops from "@/data/shopping";
import { useSession } from "next-auth/react";

import styled from "styled-components";

// Mui
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import axios from "axios";

export default function Post() {
  const { register, watch, handleSubmit, control } = useForm({
    mode: "onChange",
  });

  const { data: session } = useSession();
  console.log(session);

  const onSubmit: SubmitHandler<FieldValues> = (userData) => {
    console.log(userData);
    const { userAge, snsId, fashionShop } = userData;
    axios
      .post("/api/post/nut2post", {
        userName: session?.user?.name,
        userAge: userAge,
        snsId: snsId,
        fashionShop: fashionShop,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  console.log(watch());

  return (
    <PostContainer>
      <PostBox>
        <TitleBox>
          <MainTitle>모델 등록하기</MainTitle>
          <Description>
            모델 등록에 필요한 정보를 간단하게 입력해 주세요
          </Description>
        </TitleBox>
        <UserInfoBox>
          <InputSubmit onSubmit={handleSubmit(onSubmit)}>
            <NameAgeBox>
              <Inputs
                variant="outlined"
                value={session?.user?.name}
                disabled={true}
              />
              <Inputs
                label="나이"
                variant="outlined"
                placeholder="나이를 입력해 주세요 "
                {...register("userAge", {
                  required: "SNS 계정을 입력해 주세요",
                })}
              />
            </NameAgeBox>
            <Inputs
              label="SNS 계정 (인스타그램)"
              variant="outlined"
              placeholder="SNS 계정을 정확히 입력해 주세요 "
              {...register("snsId", {
                required: "SNS 계정을 입력해 주세요",
              })}
            />

            <Controller
              control={control}
              name="fashionShop"
              render={({ field: { ref, onChange, ...field } }) => (
                <InputSelct
                  disablePortal
                  options={koreaFamousFashionShops}
                  onChange={(_, data) => onChange(data)}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      {...field}
                      label="자주 이용하는 쇼핑몰 사이트"
                      inputRef={ref}
                      placeholder="검색"
                    />
                  )}
                />
              )}
              rules={{ required: true }}
            />
            <Button type="submit" variant="contained" endIcon={<SendIcon />}>
              SEND
            </Button>
          </InputSubmit>
        </UserInfoBox>
      </PostBox>
    </PostContainer>
  );
}

const PostContainer = styled.main`
  width: 100%;
  height: 100%;
  padding: 0px 230px;
`;

const PostBox = styled.section`
  width: 50%;
  height: auto;
  margin: 24px auto;
  padding: 40px;
  border: 1px solid #dfdfdf;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
`;

const TitleBox = styled.article`
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const MainTitle = styled.h4`
  font-size: ${({ theme }) => theme.fontSize.mainTitle};
  font-weight: ${({ theme }) => theme.fontWeight.large};
  color: ${({ theme }) => theme.fontColor.title};
`;

const Description = styled.p`
  font-size: 16px;
  color: ${({ theme }) => theme.fontColor.description};
`;

const UserInfoBox = styled.aside`
  width: 100%;
  height: 500px;
  margin-top: 40px;
`;

const InputSubmit = styled.form`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const NameAgeBox = styled.div`
  display: flex;
  gap: 16px;
`;

const Inputs = styled(TextField)`
  width: 100%;
`;

const InputSelct = styled(Autocomplete)`
  width: 100%;
`;
