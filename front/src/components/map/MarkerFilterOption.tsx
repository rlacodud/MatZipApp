import React, { useState } from 'react';
import {StyleSheet, View} from 'react-native';
import { CompoundOption } from '../common/CompoundOption';
import { MarkerColor } from '@/types/domain';
import useAuth from '@/hooks/queries/useAuth';
import { colorHex } from '@/constants';

interface MarkerFilterOptionProps {
  isVisible: boolean;
  hideOption: () => void;
}

const categoryList: MarkerColor[] = [
  'RED',
  'YELLOW',
  'GREEN',
  'BLUE',
  'PURPLE',
];

function MarkerFilterOption({isVisible, hideOption}: MarkerFilterOptionProps) {
  const [filterCondition, setFilterCondition] = useState('색상');
  const {getProfileQuery} = useAuth();
  const {categories} = getProfileQuery.data || {};

  const handleCondition = (condition: string) => {
    setFilterCondition(condition);
  }

  return (
    <CompoundOption isVisible={isVisible} hideOption={hideOption}>
      <CompoundOption.Background>
        <CompoundOption.Container>
          <CompoundOption.Title>마커 필터링</CompoundOption.Title>
          <CompoundOption.Divider/>
          <View style={styles.filterContainer}>
            {['색상', '평점'].map(condition => (
              <CompoundOption.Filter
                key={condition}
                isSelected={filterCondition === condition}
                onPress={() => handleCondition(condition)}
              >
                {condition}
              </CompoundOption.Filter>
            ))}
          </View>
          <CompoundOption.Divider/>
          {filterCondition === '색상' && (
            <>
            {categoryList.map(color => (
              <CompoundOption.CheckBox
                key={color}
                isChecked={false}
                onPress={() => {}}
                icon={
                  <View
                    style={[
                      styles.marker,
                      {backgroundColor: colorHex[color]}
                    ]}
                  >

                  </View>
                }
              >
                {categories?.[color]}
              </CompoundOption.CheckBox>
            ))}
            </>
          )}
          {filterCondition === '평점' && (
            <>
            {['1', '2', '3', '4', '5'].map(score => (
              <CompoundOption.CheckBox
                key={score}
                isChecked={false}
                onPress={() => {}}
              >
                {score}점
              </CompoundOption.CheckBox>
            ))}
            </>
          )}
          <CompoundOption.Divider/>
          <CompoundOption.Button onPress={hideOption}>완료</CompoundOption.Button>
        </CompoundOption.Container>
      </CompoundOption.Background>
    </CompoundOption>
  )
}

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 15,
    justifyContent: 'center',
  },
  marker: {
    width: 20,
    height: 20, 
  }
});

export default MarkerFilterOption;