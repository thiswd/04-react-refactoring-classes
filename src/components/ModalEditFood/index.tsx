import { createRef } from 'react';
import { FiCheckSquare } from 'react-icons/fi';

import { Form } from './styles';
import { Modal } from '../Modal';
import { Input } from '../Input';
import { useFoods } from '../../hooks/useFoods';
import { FormHandles } from '@unform/core';
import { Food } from '../../types';

interface ModalEditFoodProps {
  isOpen: boolean;
  setIsOpen: () => void;
}

export function ModalEditFood({ isOpen, setIsOpen }: ModalEditFoodProps) {
  const { editingFood, editFood } = useFoods();
  const formRef = createRef<FormHandles>();

  function handleSubmit(data: Food) {
    editFood(data);
    setIsOpen();
  }

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Form ref={formRef} onSubmit={handleSubmit} initialData={editingFood}>
        <h1>Editar Prato</h1>
        <Input name="image" placeholder="Cole o link aqui" />

        <Input name="name" placeholder="Ex: Moda Italiana" />
        <Input name="price" placeholder="Ex: 19.90" />

        <Input name="description" placeholder="Descrição" />

        <button type="submit" data-testid="edit-food-button">
          <div className="text">Editar Prato</div>
          <div className="icon">
            <FiCheckSquare size={24} />
          </div>
        </button>
      </Form>
    </Modal>
  );
}
