<template>
  <q-page class="" padding>
    <q-table title="treats" :rows="posts" :columns="columns" row-key="name">
      <template v-slot:body-cell-actions="props">
        <q-td :props="props">
          <q-btn
            icon="delete"
            @click="handleDeletePost(props.row.id)"
            color="negative"
            dense
          />
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import usePosts from '../services/posts';
import { QTableProps } from 'quasar';
import { useQuasar } from 'quasar';

const posts = ref([]);
const { list, remove } = usePosts();

const columns: QTableProps['columns'] = [
  { name: 'id', label: 'Id', field: 'id', sortable: true, align: 'left' },
  {
    name: 'title',
    label: 'Title',
    field: 'title',
    sortable: true,
    align: 'left',
  },
  {
    name: 'author',
    label: 'Author',
    field: 'author',
    sortable: true,
    align: 'left',
  },
  {
    name: 'actions',
    label: 'Actions',
    field: 'actions',
    align: 'right',
  },
];

const $q = useQuasar();

onMounted(() => {
  getPosts();
});

const getPosts = async () => {
  try {
    const data = await list();
    posts.value = data;
  } catch (err) {
    console.log(err);
  }
};

const handleDeletePost = async (id: number) => {
  try {
    await remove(id);
    $q.dialog({
      title: 'confirm',
      message: 'would you like to delete this post?',
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        await remove(id);
        $q.notify({
          color: 'positive',
          message: 'Post deleted successfully',
        });
        await getPosts();
      })
      .onCancel(() => {
        $q.notify({
          color: 'negative',
          message: 'Post not deleted',
        });
      });

    await getPosts();
  } catch (err) {
    $q.notify({
      color: 'negative',
      message: 'Error deleting post',
    });
    console.log(err);
  }
};
</script>
