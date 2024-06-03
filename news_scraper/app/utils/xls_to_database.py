# app/utils/xls_to_database.py
import pandas as pd
from sqlalchemy.ext.asyncio import AsyncSession
from app.models.ev_registration import EVRegistration

async def load_excel_to_db(file_path: str, db: AsyncSession):
    # 엑셀 파일 읽기
    df = pd.read_excel(file_path, header=0)

    # 엑셀 파일의 열 이름을 출력하여 확인
    print(df.columns)

    # '년월'을 'year'와 'month'로 분리
    df['year'] = df['년월'].apply(lambda x: int(str(x)[:4]))
    df['month'] = df['년월'].apply(lambda x: int(str(x)[5:7]))

    # 각 지역별 데이터를 변환하여 삽입
    regions = df.columns[1:-1]  # '년월'과 '합계'를 제외한 나머지 열 이름
    for region in regions:
        region_df = df[['year', 'month', region]]
        region_df.columns = ['year', 'month', 'count']
        region_df['count'] = pd.to_numeric(region_df['count'], errors='coerce').fillna(0).astype(int)  # NaN을 0으로 채우고 정수형으로 변환
        for _, row in region_df.iterrows():
            registration = EVRegistration(
                region=region,
                year=int(row["year"]),
                month=int(row["month"]),
                count=int(row["count"])
            )
            db.add(registration)
    await db.commit()
