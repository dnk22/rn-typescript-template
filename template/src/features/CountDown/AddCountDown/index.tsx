import React, { memo, useCallback, useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import {
  InputField,
  ModalNavigationHeaderBar,
  PressableHaptic,
  SvgIcon,
  DateTimeModalPicker,
} from 'components/index';
import styles from './styles';
import isEqual from 'react-fast-compare';
import { NavigationProp, useRoute } from '@react-navigation/native';
import { useCustomTheme } from 'resources/theme';
import { useForm } from 'react-hook-form';
import { ICountDownCategory, TAddCountDown, TCountDown } from '../type';
import { formatDateLocal } from 'utils/index';
import { useAppDispatch, useAppSelector } from 'store/index';
import { addOrUpdateCountDown } from 'store/countDown/countDown.slice';
import { FIELD_NAME } from '../constants';
import ColorPicker from 'react-native-color-picker-ios';
import { RootStackScreenProps } from 'navigation/type';
import { countDownSelectors } from 'store/countDown/countDown.selector';
import AlertSelections from 'components/AlertSelections';
import { BellModel, CategoryModal } from './Modal';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

interface IAddCountDownProps {
  navigation: NavigationProp<any, any>;
}
const initialAddFormValues: TAddCountDown = {
  name: '',
  description: '',
  targetDateTime: new Date(),
  alerts: [],
};

function AddCountDown({ navigation }: IAddCountDownProps) {
  const { colors } = useCustomTheme();
  const dispatch = useAppDispatch();
  const { params } =
    useRoute<RootStackScreenProps<'countDownDetails'>['route']>();
  const [isModalShowType, setIsModalShowType] = useState<string | undefined>(
    undefined
  );
  const [isDateTimeModalType, setIsDateTimeModalType] = useState<
    'date' | 'time' | undefined
  >(undefined);
  const getCountDownById = params?.countDownId
    ? useAppSelector((state) =>
        countDownSelectors.selectById(state, params?.countDownId)
      )
    : {};
  //init form
  const { control, handleSubmit, getValues, setValue, watch } =
    useForm<TCountDown>({
      defaultValues: {
        ...initialAddFormValues,
        ...getCountDownById,
      },
    });
  // get form values
  const { categoryId, categoryName, targetDateTime, alerts } = getValues();

  const onHandleBack = useCallback(() => {
    navigation.goBack();
  }, []);

  const onToggleModal = useCallback((type?: string) => {
    setIsModalShowType(type);
  }, []);

  const onToggleDateTimeModal = useCallback((type?: 'date' | 'time') => {
    setIsDateTimeModalType(type);
  }, []);

  const onHandleCategorySelect = useCallback(
    ({ id, name }: ICountDownCategory) => {
      setValue('categoryId', id);
      setValue('categoryName', name);
    },
    []
  );

  const onDateTimePicker = useCallback((date: Date) => {
    setValue('targetDateTime', date);
  }, []);

  const onHandleAlertChange = useCallback((data: number[]) => {
    setValue('alerts', data);
  }, []);

  const isShowDateTimeModal =
    isDateTimeModalType === 'date' || isDateTimeModalType === 'time';
  const isCategoryModal = isModalShowType === 'category';
  const isBellModal = isModalShowType === 'bell';
  const title = params?.countDownId
    ? 'Chỉnh sửa đếm ngược'
    : 'Tạo mới đếm ngược';

  const onHandleSubmit = (data: TCountDown) => {
    dispatch(addOrUpdateCountDown(data));
    navigation.goBack();
  };

  const onHandleColorPicker = () => {
    ColorPicker.showColorPicker({ initialColor: colors.primary }, (value) => {
      setValue('color', value);
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ModalNavigationHeaderBar text={{ title }} onBack={onHandleBack} />
      {/* modal render */}
      <CategoryModal
        isVisible={isCategoryModal}
        onToggleModal={onToggleModal}
        categoryId={categoryId}
        onHandleCategorySelect={onHandleCategorySelect}
      />
      <BellModel isVisible={isBellModal} onToggleModal={onToggleModal} />
      <DateTimeModalPicker
        value={targetDateTime}
        isVisible={isShowDateTimeModal}
        mode={isDateTimeModalType}
        onToggleModal={onToggleDateTimeModal}
        onDateTimePicker={onDateTimePicker}
      />
      {/* end modal render */}
      <KeyboardAwareScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        extraScrollHeight={60}
      >
        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <InputField
            name={FIELD_NAME.NAME}
            control={control}
            style={[styles.inputName]}
            placeholder="Tên"
            clearButtonMode="always"
            autoFocus={true}
          />
          <View style={[styles.divider, { backgroundColor: colors.divider }]} />
          <InputField
            name={FIELD_NAME.DESCRIPTION}
            control={control}
            style={[styles.inputDesc]}
            placeholder="Chi tiết"
            maxLength={60}
            clearButtonMode="always"
            multiline
          />
        </View>
        <View style={[styles.group, styles.groupRow]}>
          <PressableHaptic
            style={[
              styles.groupChild,
              styles.categoryAndSoundView,
              { backgroundColor: colors.surface },
            ]}
            onPress={() => {
              setIsModalShowType('category');
            }}
          >
            <SvgIcon
              name="category"
              style={styles.icon}
              size={20}
              color={watch('color')}
            />
            <Text style={[styles.label, { color: colors.text }]}>
              {categoryName || 'Danh mục'}
            </Text>
          </PressableHaptic>
          <PressableHaptic
            style={[
              styles.groupChild,
              styles.colorView,
              { backgroundColor: colors.surface },
            ]}
            onPress={onHandleColorPicker}
          >
            <View
              style={[styles.colorPicker, { backgroundColor: watch('color') }]}
            />
          </PressableHaptic>
          <PressableHaptic
            style={[
              styles.groupChild,
              styles.categoryAndSoundView,
              { backgroundColor: colors.surface },
            ]}
            onPress={() => setIsModalShowType('bell')}
          >
            <SvgIcon
              name="bellWaves"
              style={styles.icon}
              size={26}
              color={watch('color')}
            />
            <Text style={[styles.label, { color: colors.text }]}>Âm báo</Text>
          </PressableHaptic>
        </View>
        <View style={[styles.group, { backgroundColor: colors.surface }]}>
          <View style={styles.groupChildRow}>
            <Text style={[styles.label, { color: colors.text }]}>
              Thời gian?
            </Text>
            <View style={styles.groupChildRow}>
              <PressableHaptic
                style={[
                  styles.dateTimePicker,
                  { backgroundColor: colors.background },
                ]}
                onPress={() => setIsDateTimeModalType('date')}
              >
                <Text style={[styles.dateTimeText, { color: colors.text }]}>
                  {formatDateLocal(watch('targetDateTime'), 'dd/MM/yyyy')}
                </Text>
              </PressableHaptic>
              <PressableHaptic
                style={[
                  styles.dateTimePicker,
                  { backgroundColor: colors.background },
                ]}
                onPress={() => setIsDateTimeModalType('time')}
              >
                <Text style={[styles.dateTimeText, { color: colors.text }]}>
                  {formatDateLocal(watch('targetDateTime'), 'HH:mm')}
                </Text>
              </PressableHaptic>
            </View>
          </View>
        </View>
        <AlertSelections
          values={alerts}
          dateValidation={targetDateTime}
          onValuesChange={onHandleAlertChange}
        />
        <View style={{ height: 200 }} />
      </KeyboardAwareScrollView>
      <View style={styles.submitContainer}>
        <Pressable
          onPress={handleSubmit(onHandleSubmit)}
          style={[styles.submit, { backgroundColor: colors.primary }]}
        >
          <Text style={styles.textSubmit}>Xác nhận</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default memo(AddCountDown, isEqual);
