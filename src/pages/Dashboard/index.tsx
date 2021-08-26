import { useState } from 'react';

import { Header } from '../../components/Header';
import { ModalAddFood } from '../../components/ModalAddFood';
import { ModalEditFood } from '../../components/ModalEditFood';
import { FoodsContainer } from './styles';
import { useFoods } from '../../hooks/useFoods';
import { FoodCard } from '../../components/FoodCard';
import { Food } from '../../types'

export function Dashboard() {
  const { foods, setEditingFood } = useFoods();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  function toggleModal() {
    const modalStatus = !isModalOpen;
    setIsModalOpen(modalStatus);
  }

  function toggleEditModal() {
    const modalStatus = !isEditModalOpen;
    setIsEditModalOpen(modalStatus);
  }

  function handleEditFood(food: Food) {
    setIsEditModalOpen(true);
    setEditingFood(food);
  }

  return (
    <>
      <Header onOpenModal={toggleModal} />
      <ModalAddFood
        isOpen={isModalOpen}
        setIsOpen={toggleModal}
      />
      <ModalEditFood
        isOpen={isEditModalOpen}
        setIsOpen={toggleEditModal}
      />

      <FoodsContainer data-testid="foods-list">
        {foods &&
          foods.map(food => (
            <FoodCard
              key={food.id}
              food={food}
              handleEditFood={handleEditFood}
            />
          ))}
      </FoodsContainer>
    </>
  );
}